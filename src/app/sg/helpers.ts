import fs from "fs";
import winston from "winston";
import FormData from "form-data";
import {
  MemberRegistration,
  MemberRegistrationForm,
  MemberRegistrationSearchData,
  MemberRegistrationRequest,
  ConsultantRegistration,
  ConsultantRegistrationForm,
  ConsultantRegistrationSearchData,
  ConsultantRegistrationRequest
} from "./models";

export function prepareFilePayload(filePath: string): FormData {
  const data = new FormData();
  const stream = fs.createReadStream(filePath);

  stream.on("end", function() {
    fs.unlink(filePath, (err) => {
      if (err) {
        throw new Error(); // TODO : throw something better
      }
      winston.debug("File deleted");
    });
  });

  data.append("file", stream);
  return data;
}

export function formatTableData(data: (MemberRegistration | ConsultantRegistration)[], entity: string): (MemberRegistrationSearchData | ConsultantRegistrationSearchData)[] | void {
  switch (entity) {
    case "members":
      return (data as MemberRegistration[]).map((memberReg: MemberRegistration) => {
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
      return (data as ConsultantRegistration[]).map((consultantReg: ConsultantRegistration) => {
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
      // TODO : throw error
      break;
  }
}

export function formatFormFields(data: MemberRegistrationForm | ConsultantRegistrationForm, entity: string): MemberRegistrationRequest | ConsultantRegistrationRequest | void {
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

  let formatted;
  switch (entity) {
    case "consultants": {
      const cData = data as ConsultantRegistrationForm;
      formatted = {
        ...cData,
        address,
        genderId,
        departmentId,
        nationalityId,
        outYear,
        droitImage,
        isApprentice: cData.isApprentice === "on"
      };
      break;
    }
    case "members": {
      const mData = data as MemberRegistrationForm;
      formatted = {
        ...mData,
        address,
        genderId,
        departmentId,
        nationalityId,
        outYear,
        droitImage,
        hasPaid: mData.hasPaid === "on",
        wantedPoleId: parseInt(mData.wantedPoleId, 10)
      };
      break;
    }
    default:
      break;
  }

  return formatted;
}
