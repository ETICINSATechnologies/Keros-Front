import { Member, Consultant } from "./models";

export function formatTableData(data: (Member | Consultant)[], entity: string) {
  switch (entity) {
    case "members":
      return data.map((member: Member) => {
        const positionId = member.positions && member.positions[0] ?
          member.positions[0].id : null;
        const poleId = member.positions && member.positions[0] &&
          member.positions[0].pole ? member.positions[0].pole.id : null;
        return {
          id: member.id,
          username: member.username,
          lastName: member.lastName,
          firstName: member.firstName,
          email: member.email,
          positionId,
          poleId
        };
      });
    case "consultants":
      return data.map((consultant: Consultant) => {
        return {
          id: consultant.id,
          username: consultant.username,
          lastName: consultant.lastName,
          firstName: consultant.firstName,
          email: consultant.email,
          isEu: consultant.nationality ? consultant.nationality.isEu : false
        };
      });
    case "alumni":
      return data.map((member: Member) => {
        const positionId = member.positions && member.positions[0] ?
          member.positions[0].id : null;
        const poleId = member.positions && member.positions[0] &&
          member.positions[0].pole ? member.positions[0].pole.id : null;
        return {
          id: member.id,
          username: member.username,
          lastName: member.lastName,
          firstName: member.firstName,
          email: member.email,
          positionId,
          poleId,
          company: member.company
        };
      });
    default:
      break;
  }
}

export function formatFormFields(data: any, entity: string) {
  const address = {
    ...data.address,
    postalCode: parseInt(data.address.postalCode),
    countryId: parseInt(data.address.countryId)
  };
  const genderId = parseInt(data.genderId);
  const departmentId = parseInt(data.departmentId);
  const schoolYear = parseInt(data.schoolYear);
  const droitImage = data.droitImage === "on";

  let formatted = {
    ...data,
    address,
    genderId,
    departmentId,
    schoolYear,
    droitImage
  };

  if (!formatted.password) {
    delete formatted.password;
  }

  switch (entity) {
    case "consultants":
      formatted = {
        ...formatted,
        isApprentice: data.isApprentice === "on",
        isGraduate: data.isGraduate === "on"
      };
      break;
    case "members":
    case "alumni":
      const positions = [];
      for (const position of data.positions) {
        const updatedPosition = {
          id: parseInt(position.id),
          poleId: parseInt(position.poleId),
          year: parseInt(position.year),
          isBoard: Boolean(position.isBoard)
        };
        positions.push(updatedPosition);
      }
      formatted = {
        ...formatted,
        positions
      };
      break;
    default:
      break;
  }

  return formatted;
}
