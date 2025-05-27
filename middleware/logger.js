
import { log } from "console";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsDir = path.jjoin(__dirname, '../logs');
const logFile = path.join(logsDir, 'requests.json');

// Garante que a pasta e o arquivo existem
function ensureLogFile() {
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logDir);
    }

    if (!fs.existsSync(logFile)) {
        fs.writeFileSync(logFile, '[]');
    }
}

// Middleware para verificar se a pasta e o arquivo existe
function logger(request,response, next) {
    ensureLogFile();
}

const logData = {
    date: new Date().toLocaleDateString(),
    method: request.method,
    url: request.url,
    body: request.body
};

console.log(`[${logData.date}] ${logData.method} ${logData.url}`);

fs.readFile(logFile, 'utf-8', (erro, data) => {
    let logs = [];
    try {
        logs = JSON.parse(data || '[]');
    } catch {
        logs = [];
    }

    logs.push(logData);

    fs.writeFile(logFile, JSON.stringify(logs, null, 2),(erro) => {
        if (erro)  {
            console.error('Erro ao salvar log:', erro);
        }
    });
});

next();

export default logger;