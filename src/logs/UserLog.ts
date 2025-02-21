import fs from 'fs';

const filePath = './data/user.log';

export function createLogUser(id: string, idEvent: string, date: Date, action: string) {
  const eventString = `Id: ${id}, User: ${idEvent}, Date: ${date}, Action: ${action}\n`;

  try {
    fs.appendFileSync(filePath, eventString, 'utf-8');
  } catch (error) {
    console.error(`Erro creating user log`);
  }
}
