import {NextFunction, Request, Response} from "express";
import {MemberService} from "../../services/core/MemberService";
import {Member} from "../../models/core/Member";
import {MemberCreateRequest} from "../../models/core/MemberCreateRequest";
import * as winston from "winston";
import {Page} from "../../models/core/Page";
import {DepartmentService} from "../../services/core/DepartmentService";
import {Department} from "../../models/core/Department";
import {GenderService} from "../../services/core/GenderService";
import {Gender} from "../../models/core/Gender";
import {CountryService} from "../../services/core/CountryService";
import {Country} from "../../models/core/Country";
import {PositionService} from "../../services/core/PositionService";
import {AddressCreateRequest} from "../../models/core/AddressCreateRequest";
import * as httpContext from "express-http-context";

export class MemberController {
  public viewMembers(req: Request, res: Response, next: NextFunction) {
    MemberService.getAllMembers(function (err, page: Page<Member> | null) {
      winston.info("Getting all members");
      if (err) {
        return next(err);
      }
      const options = {
        members: page,
      };
      res.render("core/member/viewAll", options);
    });
  }

  public createMember(req: Request, res: Response, next: NextFunction) {
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
              action: "create"
            };
            res.render("core/member/viewMember", options);
          });
        });
      });
    });
  }

  public viewMember(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    MemberService.getMember(id, function (err1, member: Member | null) {
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
                action: "view"
              };
              res.render("core/member/viewMember", options);
            });
          });
        });
      });
    });
  }

  public updateMember(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    MemberService.getMember(id, function (err1, member: Member | null) {
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
                action: "update"
              };
              res.render("core/member/viewMember", options);
            });
          });
        });
      });
    });
  }

  public postMemberForm(req: Request, res: Response, next: NextFunction) {
    const userId = parseInt(req.body.id);

    let currentUserId = httpContext.get("connectedUser").id;

    const userRequest = new MemberCreateRequest();
    userRequest.lastName = req.body.lastName;
    userRequest.firstName = req.body.firstName;
    userRequest.username = req.body.username;
    if (req.body.password) userRequest.password = req.body.password;
    userRequest.genderId = parseInt(req.body.genderId);
    userRequest.email = req.body.email;
    userRequest.birthday = req.body.birthday;
    userRequest.departmentId = parseInt(req.body.departmentId);
    userRequest.schoolYear = parseInt(req.body.schoolYear);
    userRequest.telephone = req.body.telephone;

    userRequest.positionIds = [parseInt(req.body.positionId1)];
    if (req.body.positionId2) userRequest.positionIds.push(parseInt(req.body.positionId2));
    if (req.body.positionId3) userRequest.positionIds.push(parseInt(req.body.positionId3));

    const addressRequest = new AddressCreateRequest();
    addressRequest.line1 = req.body.line1;
    addressRequest.line2 = req.body.line2;
    addressRequest.city = req.body.city;
    addressRequest.postalCode = req.body.postalCode;
    addressRequest.countryId = parseInt(req.body.countryId);
    userRequest.address = addressRequest;

    if (userId) {
      MemberService.update(userId, userRequest, function (err1) {
        if (err1) {
          return next(err1);
        }
        if (userId === currentUserId) res.redirect("/core/member/me");
        else res.redirect("/core/member");
      });
    } else {
      MemberService.createMember(userRequest, function (err1) {
        if (err1) {
          return next(err1);
        }
        res.redirect("/core/member");
      });
    }
  }

  public viewProfile(req: Request, res: Response, next: NextFunction) {
    MemberService.getConnectedMember(function (err1, member: Member | null) {
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
                page: "profile",
                departments: departments,
                gender: genders,
                countries: countries,
                positions: positions,
                action: "view"
              };
              res.render("core/member/viewProfile", options);
            });
          });
        });
      });
    });
  }

  public deleteMember(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    winston.info("Deleting Member for id " + userId);
    MemberService.delete(userId, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/core/member");
    });
  }

}
