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
      const options = {
        studies: page,
      };

      res.render("ua/study/viewAll", options);
    });
  }

  public createStudy(req: Request, res: Response, next: NextFunction) {
    winston.info("Getting create study form");
    FieldService.getAllFields(function (err1, fields: Field[] | null) {
      StatusService.getAllStatus(function (err2, status: Status[] | null) {
        FirmService.getAllFirms(function (err3, firms: Page<Firm> | null) {
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
                  action: "create"
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
    winston.info("Getting study for id " + id);
    StudyService.getStudy(id, function (err1, study: Study | null) {
      FieldService.getAllFields(function (err2, fields: Field[] | null) {
        StatusService.getAllStatus(function (err3, status: Status[] | null) {
          FirmService.getAllFirms(function (err4, firms: Page<Firm> | null) {
            ContactService.getAllContacts(function (err5, contactShorts: Page<Contact> | null) {
              MemberService.getAllMembers(function (err6, memberShorts: Page<Member> | null) {
                ProvenanceService.getAllProvenances(function (err7 , provenances: Provenance[] | null) {
                  if (err1) return next(err1);
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
                    action: "view"
                  };
                  res.render("ua/study/viewStudy", options);
                });
              });
            });
          });
        });
      });
    });
  }

  public updateStudy(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    winston.info("Updating study for id " + id);
    StudyService.getStudy(id, function (err1, study: Study | null) {
      FieldService.getAllFields(function (err2, fields: Field[] | null) {
        StatusService.getAllStatus(function (err3, status: Status[] | null) {
          FirmService.getAllFirms(function (err4, firms: Page<Firm> | null) {
            ContactService.getAllContacts(function (err5, contactShorts: Page<Contact> | null) {
              MemberService.getAllMembers(function (err6, memberShorts: Page<Member> | null) {
                ProvenanceService.getAllProvenances(function (err7 , provenances: Provenance[] | null) {
                  if (err1) return next(err1);
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
                    action: "update"
                  };
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
    const id = parseInt(req.body.id);

    const studyRequest = new StudyCreateRequest();
    studyRequest.projectNumber = parseInt(req.body.projectNumber);
    studyRequest.name = req.body.name;
    studyRequest.description = req.body.description;
    studyRequest.fieldId = parseInt(req.body.fieldId);
    studyRequest.statusId = parseInt(req.body.statusId);
    studyRequest.provenanceId = parseInt(req.body.provenanceId);
    studyRequest.signDate = req.body.signDate;
    studyRequest.endDate = req.body.endDate;
    studyRequest.managementFee = parseFloat(req.body.managementFee);
    studyRequest.realizationFee = parseFloat(req.body.realizationFee);
    studyRequest.rebilledFee = parseFloat(req.body.rebilledFee);
    studyRequest.ecoparticipationFee = parseFloat(req.body.ecoparticipationFee);
    studyRequest.outsourcingFee = parseFloat(req.body.outsourcingFee);
    studyRequest.archivedDate = req.body.archivedDate;
    studyRequest.firmId = parseInt(req.body.firmId);
    studyRequest.contactIds = [parseInt(req.body.contactId1)];
    if (req.body.contactId2) studyRequest.contactIds.push(parseInt(req.body.contactId2));
    if (req.body.contactId3) studyRequest.contactIds.push(parseInt(req.body.contactId3));
    studyRequest.leaderIds = [parseInt(req.body.leaderId1)];
    if (req.body.leaderId2) studyRequest.leaderIds.push(parseInt(req.body.leaderId2));
    if (req.body.leaderId3) studyRequest.leaderIds.push(parseInt(req.body.leaderId3));
    studyRequest.consultantIds = [parseInt(req.body.consultantId1)];
    if (req.body.consultantId2) studyRequest.consultantIds.push(parseInt(req.body.consultantId2));
    if (req.body.consultantId3) studyRequest.consultantIds.push(parseInt(req.body.consultantId3));
    studyRequest.qualityManagerIds = [parseInt(req.body.qualityManagerId1)];
    if (req.body.qualityManagerId2) studyRequest.qualityManagerIds.push(parseInt(req.body.qualityManagerId2));
    if (req.body.qualityManagerId3) studyRequest.qualityManagerIds.push(parseInt(req.body.qualityManagerId3));

    if (id) {
      StudyService.update(id, studyRequest, function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/ua/study");
      });
    } else {
      StudyService.createStudy(studyRequest, function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/ua/study");
      });
    }
  }
}