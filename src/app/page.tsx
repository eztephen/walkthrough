import InspectionApp from "@/components/InspectionApp";

export default function Home() {
  return (
    <>
      <div className="no-print bg-band text-[0.8rem] text-[#CFE6E4]">
        <p className="site-wrap py-2 text-center">
          Live demo — everything works. <b className="text-white">Sample property pre-loaded</b>, so you can jump
          straight to the finished report.
        </p>
      </div>
      <InspectionApp />
    </>
  );
}
