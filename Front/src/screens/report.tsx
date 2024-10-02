import { Api } from "@/api";
import React from "react";

function Report() {
  const handleDownload = async () => {
    try {
      const response = await Api.get("/pdf", {
        responseType: "blob", // Isso é importante para que o axios trate a resposta como um blob (arquivo binário)
      });

      // Criar um link temporário para baixar o PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "relatorio.pdf"); // Nome do arquivo
      document.body.appendChild(link);
      link.click();

      // Limpa o link temporário
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Erro ao baixar o PDF", error);
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>Baixar PDF</button>
    </div>
  );
}

export default Report;
