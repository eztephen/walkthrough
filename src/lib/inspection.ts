import type { Condition, MaintenanceItem, Photo, Room } from "./types";

export type InspectionAction =
  | { type: "setCondition"; roomId: string; condition: Condition }
  | { type: "setNote"; roomId: string; note: string }
  | { type: "addPhotos"; roomId: string; photos: Photo[] }
  | { type: "removePhoto"; roomId: string; photoId: string }
  | { type: "addMaintenance"; roomId: string; item: MaintenanceItem }
  | { type: "removeMaintenance"; roomId: string; itemId: string };

const update = (rooms: Room[], roomId: string, change: (room: Room) => Room) =>
  rooms.map((room) => (room.id === roomId ? change(room) : room));

export function inspectionReducer(rooms: Room[], action: InspectionAction): Room[] {
  switch (action.type) {
    case "setCondition":
      // Tapping the selected condition again clears it.
      return update(rooms, action.roomId, (room) => ({
        ...room,
        condition: room.condition === action.condition ? null : action.condition,
      }));
    case "setNote":
      return update(rooms, action.roomId, (room) => ({ ...room, note: action.note }));
    case "addPhotos":
      return update(rooms, action.roomId, (room) => ({ ...room, photos: [...room.photos, ...action.photos] }));
    case "removePhoto":
      return update(rooms, action.roomId, (room) => ({
        ...room,
        photos: room.photos.filter((p) => p.id !== action.photoId),
      }));
    case "addMaintenance":
      // Logging maintenance on a room nobody has assessed yet marks it as needing attention.
      return update(rooms, action.roomId, (room) => ({
        ...room,
        condition: room.condition ?? "attention",
        maintenance: [...room.maintenance, action.item],
      }));
    case "removeMaintenance":
      return update(rooms, action.roomId, (room) => ({
        ...room,
        maintenance: room.maintenance.filter((m) => m.id !== action.itemId),
      }));
  }
}
