import { NextFunction, Request, Response } from "express";
import { StudyService } from "../../services/ua/StudyService";
import { Study } from "../../models/ua/Study";
import * as winston from "winston";
import { Page } from "../../models/core/Page";
import { DepartmentService } from "../../services/core/DepartmentService";
import { Department } from "../../models/core/Department";
import { StatusService } from "../../services/ua/StatusService";
import { Status } from "../../models/ua/Status";
import { FirmService } from "../../services/ua/FirmService";
import { Firm } from "../../models/ua/Firm";
import { ContactShortService } from "../../services/ua/ContactShortService";
import { ContactShort } from "../../models/ua/ContactShort";
import { MemberShortService } from "../../services/core/MemberShortService";
import { MemberShort } from "../../models/core/MemberShort";
import { StudyCreateRequest } from "../../models/ua/StudyCreateRequest";

export class StudyController {
  public viewStudies(req: Request, res: Response, next: NextFunction) {
    StudyService.getAllStudies(function (err, page: Page<Study> | null) {
      winston.info("Getting all studies");
      if (err) {
        return next(err);
      }
      winston.debug("Page = " + JSON.stringify(page));
      const options = {
        studies: page,
      };

      res.render("ua/study/viewAll", options);
    });
  }

  public viewStudyForm(req: Request, res: Response, next: NextFunction) {
    winston.info("Getting create study form");
    DepartmentService.getAllDepartments(function (err1, departments: Department[] | null) {
      StatusService.getAllStatus(function (err2, status: Status[] | null) {
        FirmService.getListOfAllFirms(function (err3, firms: Firm[] | null) {
         ContactShortService.getAllContactShorts(function (err4, contactShorts: ContactShort[] | null) {
           MemberShortService.getAllMemberShorts(function (err5, memberShorts: MemberShort[] | null) {
             if (err1) return next(err1);
             if (err2) return next(err2);
             if (err3) return next(err3);
             if (err4) return next(err4);
             if (err5) return next(err5);
             const options = {
               departments: departments,
               status: status,
               firms: firms,
               contactShorts: contactShorts,
               memberShorts: memberShorts,
             };
             res.render("ua/study/viewStudy", options);
           });
         });
        });
      });
    });
  }

  public viewStudy(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    winston.info("Getting study form for id " + id);
    StudyService.getStudy(id, function (err, study: Study | null) {
      if (study === null) {
        return next(err);
      }
      DepartmentService.getAllDepartments(function (err2, departments: Department[] | null) {
        StatusService.getAllStatus(function (err3, status: Status[] | null) {
          FirmService.getListOfAllFirms(function (err4, firms: Firm[] | null) {
            ContactShortService.getAllContactShorts(function (err5, contactShorts: ContactShort[] | null) {
              MemberShortService.getAllMemberShorts(function (err6, memberShorts: MemberShort[] | null) {
                if (err) return next(err);
                if (err2) return next(err2);
                if (err3) return next(err3);
                if (err4) return next(err4);
                if (err5) return next(err5);
                if (err6) return next(err6);
                const options = {
                  study: study,
                  departments: departments,
                  status: status,
                  firms: firms,
                  contactShorts: contactShorts,
                  memberShorts: memberShorts,
                };
                winston.debug("Study: " + JSON.stringify(study));
                res.render("ua/study/viewStudy", options);
              });
            });
          });
        });
      });
    });
  }

  public postStudyForm(req: Request, res: Response, next: NextFunction) {
    const projectNumber = req.body.projectNumber;
    const name = req.body.name;
    const description = req.body.description;
    const departmentId = req.body.departmentId;
    const statusId = req.body.statusId;
    const signDate = req.body.signDate;
    const endDate = req.body.endDate;
    const managementFee = req.body.managementFee;
    const applicationFee = req.body.applicationFee;
    const rebilledFee = req.body.rebilledFee;
    const archivedDate = req.body.archivedDate;
    const firmId = req.body.firmId;
    const contactId1 = req.body.contactId1;
    const contactId2 = req.body.contactId2;
    const contactId3 = req.body.contactId3;
    const leaderId = req.body.leaderId;
    const consultantId1 = req.body.consultantId1;
    const consultantId2 = req.body.consultantId2;
    const consultantId3 = req.body.consultantId3;
    const qualityManagerId1 = req.body.qualityManagerId1;
    const qualityManagerId2 = req.body.qualityManagerId2;
    const qualityManagerId3 = req.body.qualityManagerId3;
    const contactIds = [contactId1, contactId2, contactId3];
    const consultantIds = [consultantId1, consultantId2, consultantId3];
    const qualityManagerIds = [qualityManagerId1, qualityManagerId2, qualityManagerId3];

    const study = new StudyCreateRequest(0, projectNumber, name, description, departmentId, statusId, signDate, endDate, managementFee, applicationFee, rebilledFee, archivedDate, firmId, contactIds, leaderId, consultantIds, qualityManagerIds);
    StudyService.createStudy(study, function (err1) {
      if (err1) return next(err1);
      res.redirect("/ua/study");
    });
  }
}
