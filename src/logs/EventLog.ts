import fs from 'fs';

const filePath = './data/event.log';

export function createLogEvent(id: string, idUser: string, date: Date, action: string) {
  const eventString = `Id: ${id}, User: ${idUser}, Date: ${date}, Action: ${action}\n`;

  try {
    fs.appendFileSync(filePath, eventString, 'utf-8');
  } catch (error) {
    console.error(`Erro creating event log`);
  }
}
