import NewNavbar from "@/components/NewNavbar";
import PromptBar from "@/components/PromptBar";

const Aletheia = () => {
  return (
    <div className="text-white bg-black min-h-screen flex flex-col">
      <NewNavbar />

      <hr className="border-gray-500 border-t" />

      <main className="flex-1 flex items-center justify-center px-4">
        <PromptBar />
      </main>
    </div>
  );
};

export default Aletheia;
