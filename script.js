document.getElementById("mergeBtn").addEventListener("click", async function () {
    let files = document.getElementById("pdfFiles").files;

    if (files.length < 2) {
        alert("Please select at least two PDF files to merge.");
        return;
    }

    document.getElementById("status").textContent = "Merging files...";

    try {
        const mergedPdf = await PDFLib.PDFDocument.create();

        for (let file of files) {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
            const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();

        // Create a Blob and generate a download link
        const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        let link = document.getElementById("downloadLink");
        link.href = url;
        link.style.display = "block";
        link.textContent = "Download Merged PDF";
        document.getElementById("status").textContent = "Merge successful!";
    } catch (error) {
        document.getElementById("status").textContent = "Error merging files.";
        alert("An error occurred: " + error.message);
    }
});
