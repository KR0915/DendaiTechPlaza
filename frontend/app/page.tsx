import TopClientComponent from "./topPage/components/topClient";

export default async function Home() {
  return (
    <div>
      <div className="bg-slate-200">
        <div className="space-y-2 p-8 max-w-4xl mx-auto">
          <TopClientComponent />
        </div>
      </div>
    </div>
  );
}
