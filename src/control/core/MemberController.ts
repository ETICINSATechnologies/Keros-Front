import { NextFunction, Request, Response } from "express";
import { MemberService } from "../../services/core/MemberService";
import { AddressService } from "../../services/core/AddressService";
import { Member } from "../../models/core/Member";
import { MemberCreateRequest } from "../../models/core/MemberCreateRequest";
import { Address } from "../../models/core/Address";
import * as winston from "winston";
import { Page } from "../../models/core/Page";
import { DepartmentService } from "../../services/core/DepartmentService";
import { Department } from "../../models/core/Department";
import { GenderService } from "../../services/core/GenderService";
import { Gender } from "../../models/core/Gender";
import { CountryService } from "../../services/core/CountryService";
import { Country } from "../../models/core/Country";
import { PositionService } from "../../services/core/PositionService";

export class MemberController {
  public viewMembers(req: Request, res: Response, next: NextFunction) {
    MemberService.getAllMembers(function (err, page: Page<Member> | null) {
      winston.info("Getting all members");
      if (err) {
        return next(err);
      }
      winston.debug("Page = " + JSON.stringify(page));
      const options = {
        members: page,
      };
      res.render("core/member/viewAll", options);
    });
  }

  public viewMemberForm(req: Request, res: Response, next: NextFunction) {
    winston.info("Getting create member form");
    DepartmentService.getAllDepartments(function (err1, departments: Department[] | null) {
      GenderService.getAllGenders(function (err2, genders: Gender[] | null) {
        CountryService.getAllCountries(function (err3, countries: Country[] | null) {
          PositionService.getAllPositions(function (err4, positions: Position[] | null) {
            if (err1) return next(err1);
            if (err2) return next(err2);
            if (err3) return next(err3);
            if (err4) return next(err4);
            const options = {
              departments: departments,
              gender: genders,
              countries: countries,
              positions: positions,
            };
            winston.debug("Gender : " + JSON.stringify(genders));
            res.render("core/member/viewMember", options);
          });
        });
      });
    });
  }

  public viewMember(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    MemberService.getMember(id, function (err1, member: Member | null) {
      if (member === null) {
        return next(err1);
      }
      DepartmentService.getAllDepartments(function (err2, departments: Department[] | null) {
        GenderService.getAllGenders(function (err3, genders: Gender[] | null) {
          CountryService.getAllCountries(function (err4, countries: Country[] | null) {
            PositionService.getAllPositions(function (err5, positions: Position[] | null) {
              if (err1) return next(err1);
              if (err2) return next(err2);
              if (err3) return next(err3);
              if (err4) return next(err4);
              if (err5) return next(err5);
              const options = {
                member: member,
                departments: departments,
                gender: genders,
                countries: countries,
                positions: positions,
              };
              winston.debug("Member : " + JSON.stringify(member));
              res.render("core/member/viewMember", options);
            });
          });
        });
      });
    });
  }

  public postMemberForm(req: Request, res: Response, next: NextFunction) {
    const id = req.body.id;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const userName = req.body.userName;
    const password = req.body.password;
    const gender = +req.body.genderId;
    const email = req.body.email;
    const birthday = req.body.birthday;
    const departmentId = +req.body.departmentId;
    const schoolYear = +req.body.schoolYear;
    const telephone = req.body.telephone;
    const line1 = req.body.line1;
    const line2 = req.body.line2;
    const city = req.body.city;
    const postalCode = req.body.postalCode;
    const countryId = +req.body.countryId;
    const positionId1 = +req.body.positionId1;
    const positionIds = [positionId1];
    const positionId2 = +req.body.positionId2;
    if (positionId2) positionIds.push(positionId2);
    const positionId3 = +req.body.positionId3;
    if (positionId3) positionIds.push(positionId3);
    const address = new Address(1, line1, line2, postalCode, city, new Country(countryId));
    const user = new MemberCreateRequest(firstName, lastName, userName, password, gender, email, birthday, departmentId, schoolYear, telephone, address, positionIds);
    if (id) {
      MemberService.update(id, user, function (err1) {
        if (err1) {
          return next(err1);
        }
        res.redirect("/core/member");
      });
    } else {
      MemberService.createMember(user, function (err1) {
        if (err1) {
          return next(err1);
        }
        res.redirect("/core/member");
      });
    }
  }
}
