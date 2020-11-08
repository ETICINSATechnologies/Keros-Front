import { MemberRegistration, ConsultantRegistration } from "./models";

export function formatTableData(data: (MemberRegistration | ConsultantRegistration)[], entity: string) {
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

export function formatFormFields(data: any, entity: string) {
  const address = {
    ...data.address,
    postalCode: parseInt(data.address.postalCode, 10),
    countryId: parseInt(data.address.countryId, 10)
  };
  const genderId = parseInt(data.genderId, 10);
  const departmentId = parseInt(data.departmentId, 10);
  const outYear = parseInt(data.outYear, 10);
  const nationalityId = parseInt(data.nationalityId, 10);
  const droitImage = data.droitImage === "on";

  let formatted = {
    ...data,
    address,
    genderId,
    departmentId,
    nationalityId,
    outYear,
    droitImage
  };

  switch (entity) {
    case "consultants":
      formatted = {
        ...formatted,
        isApprentice: data.isApprentice === "on"
      };
      break;
    case "members":
      formatted = {
        ...formatted,
        hasPaid: data.hasPaid === "on",
        wantedPoleId: parseInt(data.wantedPoleId, 10)
      };
      break;
    default:
      break;
  }

  return formatted;
}
