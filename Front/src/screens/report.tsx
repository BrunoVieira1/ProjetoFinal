import { Api } from "@/api";
import React from "react";

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
    <div>
      <button onClick={handleDownload}>Baixar PDF</button>
    </div>
  );
}

export default Report;
