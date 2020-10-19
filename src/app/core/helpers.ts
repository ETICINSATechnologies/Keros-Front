import { Member, Consultant } from "./models";

export function deserializeTableData(data: (Member | Consultant)[], entity: string) {
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
