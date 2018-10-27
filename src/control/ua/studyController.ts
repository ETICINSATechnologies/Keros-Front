import { NextFunction, Request, Response } from "express";
import { StudyService } from "../../services/ua/StudyService";
import { Study } from "../../models/ua/Study";
import * as winston from "winston";
import { Page } from "../../models/core/Page";
import { StatusService } from "../../services/ua/StatusService";
import { Status } from "../../models/ua/Status";
import { FirmService } from "../../services/ua/FirmService";
import { Firm } from "../../models/ua/Firm";
import { StudyCreateRequest } from "../../models/ua/StudyCreateRequest";
import { ContactService } from "../../services/ua/ContactService";
import { Contact } from "../../models/ua/Contact";
import { MemberService } from "../../services/core/MemberService";
import { Member } from "../../models/core/Member";
import { FieldService } from "../../services/ua/FieldService";
import { Field } from "../../models/ua/Field";
import { ProvenanceService } from "../../services/ua/ProvenanceService";
import { Provenance } from "../../models/ua/Provenance";

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
    FieldService.getAllFields(function (err1, fields: Field[] | null) {
      StatusService.getAllStatus(function (err2, status: Status[] | null) {
        FirmService.getListOfAllFirms(function (err3, firms: Firm[] | null) {
         ContactService.getAllContacts(function (err4, contacts: Page<Contact> | null) {
           MemberService.getAllMembers(function (err5, members: Page<Member> | null) {
             ProvenanceService.getAllProvenances(function (err6, provenances: Provenance[] | null) {
               if (err1) return next(err1);
               if (err2) return next(err2);
               if (err3) return next(err3);
               if (err4) return next(err4);
               if (err5) return next(err5);
               if (err6) return next(err6);
               const options = {
                 fields: fields,
                 status: status,
                 firms: firms,
                 contactShorts: contacts,
                 memberShorts: members,
                 provenances: provenances,
               };
               res.render("ua/study/viewStudy", options);
             });
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
      FieldService.getAllFields(function (err2, fields: Field[] | null) {
        StatusService.getAllStatus(function (err3, status: Status[] | null) {
          FirmService.getListOfAllFirms(function (err4, firms: Firm[] | null) {
            ContactService.getAllContacts(function (err5, contactShorts: Page<Contact> | null) {
              MemberService.getAllMembers(function (err6, memberShorts: Page<Member> | null) {
                ProvenanceService.getAllProvenances(function (err7 , provenances: Provenance[] | null) {
                  if (err) return next(err);
                  if (err2) return next(err2);
                  if (err3) return next(err3);
                  if (err4) return next(err4);
                  if (err5) return next(err5);
                  if (err6) return next(err6);
                  if (err7) return next(err7);
                  const options = {
                    study: study,
                    fields: fields,
                    status: status,
                    firms: firms,
                    contactShorts: contactShorts,
                    memberShorts: memberShorts,
                    provenances: provenances,
                  };
                  winston.debug("Study: " + JSON.stringify(study));
                  res.render("ua/study/viewStudy", options);
                });
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
    const fieldId = req.body.fieldId;
    const statusId = req.body.statusId;
    const provenanceId = req.body.provenanceId;
    const signDate = req.body.signDate;
    const endDate = req.body.endDate;
    const managementFee = req.body.managementFee;
    const realizationFee = req.body.realizationFee;
    const rebilledFee = req.body.rebilledFee;
    const ecoparticipationFee = req.body.ecoparticipationFee;
    const outsourcingFee = req.body.outsourcingFee;
    const archivedDate = req.body.archivedDate;
    const firmId = req.body.firmId;
    const contactId1 = req.body.contactId1;
    const contactId2 = req.body.contactId2;
    const contactId3 = req.body.contactId3;
    const leaderId1 = req.body.leaderId1;
    const leaderId2 = req.body.leaderId2;
    const leaderId3 = req.body.leaderId3;
    const consultantId1 = req.body.consultantId1;
    const consultantId2 = req.body.consultantId2;
    const consultantId3 = req.body.consultantId3;
    const qualityManagerId1 = req.body.qualityManagerId1;
    const qualityManagerId2 = req.body.qualityManagerId2;
    const qualityManagerId3 = req.body.qualityManagerId3;
    const contactIds = [contactId1, contactId2, contactId3];
    const leaderIds = [leaderId1, leaderId2, leaderId3];
    const consultantIds = [consultantId1, consultantId2, consultantId3];
    const qualityManagerIds = [qualityManagerId1, qualityManagerId2, qualityManagerId3];

    const study = new StudyCreateRequest(projectNumber, name, description, fieldId, statusId, provenanceId, signDate, endDate, managementFee, realizationFee, rebilledFee, ecoparticipationFee, outsourcingFee, archivedDate, firmId, contactIds, leaderIds, consultantIds, qualityManagerIds);
    StudyService.createStudy(study, function (err1) {
      if (err1) return next(err1);
      res.redirect("/ua/study");
    });
  }
}
