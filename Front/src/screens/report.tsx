import { Api } from "@/api";
import Logo from "@/components/logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


function Report() {
  const handleDownload = async () => {
    try {
      const response = await Api.get("/pdf");
      console.log(response);
    } catch (error) {
      console.error("Erro ao baixar o PDF", error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full flex-col gap-4">
      <Logo />
      <div className="flex-1 w-full p-1">
        <Tabs className="flex-1 w-full flex justify-center flex-col">
          <TabsList className="justify-between mb-2">
            <TabsTrigger value="diario" className="flex-1 data-[state=active]:bg-zinc-200">
              Diario
            </TabsTrigger>
            <TabsTrigger value="semanal" className="flex-1 data-[state=active]:bg-zinc-200">
              Semanal
            </TabsTrigger>
            <TabsTrigger value="mensal" className="flex-1 data-[state=active]:bg-zinc-200">
              Mensal
            </TabsTrigger>
          </TabsList>
          <TabsContent value="diario" className="flex justify-center gap-4 mt-0">
            <button onClick={handleDownload} className="hover:underline">Gerar PDF</button>
            <a href={`public/diario.pdf`} download="diario.pdf"  className="hover:underline">Baixar PDF</a>
          </TabsContent>
          <TabsContent value="semanal" className="flex justify-center gap-4 mt-0">
            <button onClick={handleDownload} className="hover:underline">Gerar PDF</button>
            <a href={`public/diario.pdf`} download="diario.pdf"  className="hover:underline">Baixar PDF</a>
          </TabsContent>
          <TabsContent value="mensal" className="flex justify-center gap-4 mt-0">
            <button onClick={handleDownload} className="hover:underline">Gerar PDF</button>
            <a href={`public/diario.pdf`} download="diario.pdf"  className="hover:underline">Baixar PDF</a>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}

export default Report;
