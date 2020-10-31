import { MemberRegistration, ConsultantRegistration } from "./models";

export function deserializeTableData(data: (MemberRegistration | ConsultantRegistration)[], entity: string) {
  switch (entity) {
    case "members":
      return data.map((memberReg: MemberRegistration) => {
        const department = memberReg.department ? memberReg.department.name : "";
        const wantedPole = memberReg.wantedPole ? memberReg.wantedPole.name : "";
        return {
          id: memberReg.id,
          lastName: memberReg.lastName,
          firstName: memberReg.firstName,
          email: memberReg.email,
          department,
          wantedPole,
          hasPaid: memberReg.hasPaid
        };
      });
    case "consultants":
      return data.map((consultantReg: ConsultantRegistration) => {
        const department = consultantReg.department ? consultantReg.department.name : "";
        const createdDate = consultantReg.createdDate ? consultantReg.createdDate.date : "";
        return {
          id: consultantReg.id,
          lastName: consultantReg.lastName,
          firstName: consultantReg.firstName,
          email: consultantReg.email,
          department,
          createdDate: new Date(createdDate).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })
        };
      });
    default:
      break;
  }
}
