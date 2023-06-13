function getRoleText(individ, isCustomer) {
  return `именуем${individ ? "ый" : "ое"} в дальнейшем "${
    isCustomer ? "Заказчик" : "Исполнитель"
  }"`;
}

function getLegalPart(company, isColored) {
  if (company.type !== "LEGAL") return "";

  return isColored
    ? `в лице <span style="color:#409EFF"> ${company.manager} ${company.ceo}</span>, действующего на основании Устава,`
    : `в лице  ${company.manager} ${company.ceo}, действующего на основании Устава,`;
}

function getClientLabel(client, isCustomer, isColored) {
  const companyName = client.full_name;
  const roleText = getRoleText(client.type === "INDIVIDUAL", isCustomer);
  const legalPartText = getLegalPart(client, isColored);
  return `${
    isColored
      ? `<span style="color:#409EFF">${companyName}</span>`
      : `${companyName}`
  }, ${roleText}, ${legalPartText}`;
}

function getOppositeLabel(opposite, isCustomer) {
  const roleText = getRoleText(opposite.type === "INDIVIDUAL", isCustomer);
  const companyName =
    opposite.type === "PERSON"
      ? `Частное лицо ${
          opposite.name || "Иванов Иван Иванович"
        }   , паспорт (серия, номер) ${opposite.number || "–"}, выдан ${
          opposite.date || "–"
        } ${opposite.authority || "–"}, код подразделения ${
          opposite.subdivision || "–"
        }`
      : opposite.full_name;
  const legalPartText = getLegalPart(opposite);
  return `${companyName}, ${roleText}, ${legalPartText}`;
}

export default function (client, opposite, isCustomer, isColored) {
  const clientLabel = getClientLabel(client, !isCustomer, isColored);
  const oppositeLabel = getOppositeLabel(opposite, isCustomer);
  const customer = isCustomer ? clientLabel : oppositeLabel;
  const executor = isCustomer ? oppositeLabel : clientLabel;
  const commonText =
    'совместно именуемые "Стороны", а по отдельности "Сторона", заключили настоящий Договор о нижеследующем:';

  return `${customer} с одной стороны, и ${executor} с другой стороны, ${commonText}`;
}
