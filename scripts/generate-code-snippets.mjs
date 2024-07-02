import fs from "fs";
import path from "path";

// Helper function to get the directory name correctly in ES modules
function getDirname(metaUrl) {
  const { pathname } = new URL(metaUrl);
  return path.dirname(decodeURIComponent(pathname).substring(1));
}

const __dirname = getDirname(import.meta.url);

// const COMPONENTS_DIRS = [
//   path.join(__dirname, "..", "src", "app", "data-table-components"),
//   path.join(__dirname, "..", "src", "components", "ui"),
//   path.join(__dirname, "..", "src", "components"),
// ];
const COMPONENTS_DIRS = [path.join(__dirname, "..", "src", "app", "Form")];
const OUTPUT_DIR = path.join(__dirname, "..", "public", "code-snippets");

function readFilesRecursively(dir) {
  const files = fs.readdirSync(dir);
  let fileList = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fileList = fileList.concat(readFilesRecursively(filePath));
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function generateCodeSnippets() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  COMPONENTS_DIRS.forEach((dir) => {
    const files = readFilesRecursively(dir);

    files.forEach((file) => {
      const fileContent = fs.readFileSync(file, "utf-8");
      const relativePath = path.relative(path.join(__dirname, ".."), file);
      const outputFilePath = path.join(
        OUTPUT_DIR,
        `${relativePath.replace(/[\\\/]/g, "_")}.json`
      );

      const outputDir = path.dirname(outputFilePath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(
        outputFilePath,
        JSON.stringify({ content: fileContent }, null, 2)
      );
    });
  });
}

generateCodeSnippets();
