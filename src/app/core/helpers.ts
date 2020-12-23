import {
  Member,
  MemberForm,
  MemberSearchData,
  MemberRequest,
  Consultant,
  ConsultantForm,
  ConsultantSearchData,
  ConsultantRequest
} from "./models";

export function formatTableData(data: (Member | Consultant)[], entity: string): (MemberSearchData | ConsultantSearchData)[] | void {
  switch (entity) {
    case "consultants":
      return (data as Consultant[]).map((consultant: Consultant) => {
        return {
          id: consultant.id,
          username: consultant.username,
          lastName: consultant.lastName,
          firstName: consultant.firstName,
          email: consultant.email,
          isEu: consultant.nationality ? consultant.nationality.isEu : false
        };
      });
    case "members":
    case "alumni":
      return (data as Member[]).map((member: Member) => {
        const positionId = member.positions && member.positions[0] ?
          member.positions[0].id : undefined;
        const poleId = member.positions && member.positions[0] &&
          member.positions[0].pole ? member.positions[0].pole.id : undefined;
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

export function formatFormFields(data: MemberForm | ConsultantForm, entity: string): MemberRequest | ConsultantRequest | void {
  const address = {
    ...data.address,
    postalCode: parseInt(data.address.postalCode, 10),
    countryId: parseInt(data.address.countryId, 10)
  };
  const genderId = parseInt(data.genderId, 10);
  const departmentId = parseInt(data.departmentId, 10);
  const schoolYear = parseInt(data.schoolYear, 10);
  const droitImage = data.droitImage === "on";

  if (!data.password) {
    data.password = undefined;
  }

  let formatted;
  switch (entity) {
    case "consultants": {
      const cData = data as ConsultantForm;
      formatted = {
        ...cData,
        address,
        genderId,
        departmentId,
        schoolYear,
        droitImage,
        isApprentice: cData.isApprentice === "on",
        isGraduate: cData.isGraduate === "on"
      } as ConsultantRequest;
      break;
    }
    case "members":
    case "alumni": {
      const mData = data as MemberForm;
      const isAlumni = mData.isAlumni ? entity === "members" : entity === "alumni";
      const positions = [];

      if (mData.positions) {
        for (const position of mData.positions) {
          const updatedPosition = {
            id: parseInt(position.id, 10),
            year: parseInt(position.year, 10),
            isBoard: Boolean(position.isBoard)
          };
          positions.push(updatedPosition);
        }
      }

      if (mData.positionToAdd) {
        for (const year of Object.keys(mData.positionToAdd)) {
          const addedPosition = {
            id: parseInt(mData.positionToAdd[year], 10),
            year: parseInt(year, 10),
            isBoard: false
          };
          positions.push(addedPosition);
        }
      }

      formatted = {
        ...mData,
        address,
        genderId,
        departmentId,
        schoolYear,
        droitImage,
        positions,
        isAlumni
      } as MemberRequest;
      break;
    }
    default:
      break;
  }

  return formatted;
}
