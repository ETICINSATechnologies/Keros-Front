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
import { MemberService } from "../../services/core/MemberService";
import { Member } from "../../models/core/Member";
import { FieldService } from "../../services/ua/FieldService";
import { Field } from "../../models/ua/Field";
import { ProvenanceService } from "../../services/ua/ProvenanceService";
import { Provenance } from "../../models/ua/Provenance";
import { Config } from "../../config/Config";
import { DocumentResponse } from "../../models/DocumentResponse";
import HttpError from "../../util/httpError";
import * as Busboy from "busboy";
import * as FormData from "form-data";
import { UploadedFile } from "express-fileupload";
import { MemberInscriptionService } from "../../services/sg/MemberInscriptionService";
// import { UploadedDocument } from "../../models/UploadedDocument";

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

  public viewStudiesConnectedUser(req: Request, res: Response, next: NextFunction) {
    StudyService.getAllStudiesForConnectedUser(function (err, page: Page<Study> | null) {
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
                ProvenanceService.getAllProvenances(function (err4, provenances: Provenance[] | null) {
                  if (err1) return next(err1);
                  if (err2) return next(err2);
                  if (err3) return next(err3);
                  if (err4) return next(err4);
                  const options = {
                    fields,
                    status,
                    firms,
                    provenances,
                    action: "create"
                  };
                  res.render("ua/study/viewStudy", options);
                  });
              });
          });
      });
  }

  public deleteStudy(req: Request, res: Response, next: NextFunction) {
      const id = req.params.id;
      winston.info("Delete study for id " + id);
      StudyService.delete(id, function (err) {
          if (err) {
              return next(err);
          }
          res.redirect("/ua/study");
      });
  }

  public viewStudy(req: Request, res: Response, next: NextFunction) {
      const id = req.params.id;
      let mailshots;
      winston.info("Getting study for id " + id);
      StudyService.getStudy(id, function (err1, study: Study | null) {
          FieldService.getAllFields(function (err3, fields: Field[] | null) {
              StatusService.getAllStatus(function (err4, status: Status[] | null) {
                  FirmService.getAllFirms(function (err5, firms: Page<Firm> | null) {
                    ProvenanceService.getAllProvenances(function (err6, provenances: Provenance[] | null) {
                      if (err1) return next(err1);
                      // TODO : cleaner. This request can fail if study is not valid.
                      // TODO The page should stil display
                      if (err3) return next(err3);
                      if (err4) return next(err4);
                      if (err5) return next(err5);
                      if (err6) return next(err6);
                      if (!study || !study.consultants || !study.qualityManagers) {
                        mailshots = 0;
                      } else {
                        mailshots = 1;
                      }
                      const options = {
                        study,
                        fields,
                        status,
                        firms,
                        provenances,
                        clientBaseUrl: Config.getClientBaseUrl(),
                        mailshots,
                        action: "view"
                      };
                      res.render("ua/study/viewStudy", options);
                      });
                  });
              });
          });
      });
  }

  public updateStudy(req: Request, res: Response, next: NextFunction) {
      const id = req.params.id;
      winston.info("Updating study for id " + id);
      StudyService.getStudy(id, function (err1, study: Study | null) {
          FieldService.getAllFields(function (err2, fields: Field[] | null) {
              StatusService.getAllStatus(function (err3, status: Status[] | null) {
                  FirmService.getAllFirms(function (err4, firms: Page<Firm> | null) {
                    MemberService.getAllMembers(function (err5, memberShorts: Page<Member> | null) {
                      ProvenanceService.getAllProvenances(function (err6, provenances: Provenance[] | null) {
                        if (err1) return next(err1);
                        if (err2) return next(err2);
                        if (err3) return next(err3);
                        if (err4) return next(err4);
                        if (err5) return next(err5);
                        if (err6) return next(err6);
                        const options = {
                          study,
                          fields,
                          status,
                          firms,
                          memberShorts,
                          provenances,
                          action: "update"
                        };
                        res.render("ua/study/viewStudy", options);
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
      studyRequest.confidential = !!req.body.confidential;
      studyRequest.firmId = parseInt(req.body.firmId);
    studyRequest.contactIds = [];
    if (req.body.contactId1) studyRequest.contactIds.push(parseInt(req.body.contactId1));
      if (req.body.contactId2) studyRequest.contactIds.push(parseInt(req.body.contactId2));
      if (req.body.contactId3) studyRequest.contactIds.push(parseInt(req.body.contactId3));
    studyRequest.leaderIds = [];
    if (req.body.leaderId1) studyRequest.leaderIds.push(parseInt(req.body.leaderId1));
      if (req.body.leaderId2) studyRequest.leaderIds.push(parseInt(req.body.leaderId2));
      if (req.body.leaderId3) studyRequest.leaderIds.push(parseInt(req.body.leaderId3));
    studyRequest.consultantIds = [];
    if (req.body.consultantId1) studyRequest.consultantIds.push(parseInt(req.body.consultantId1));
      if (req.body.consultantId2) studyRequest.consultantIds.push(parseInt(req.body.consultantId2));
      if (req.body.consultantId3) {
        req.body.consultantId3.forEach(function (elem: string) {
          if (studyRequest.consultantIds) studyRequest.consultantIds.push(parseInt(elem));
        });
      }
    studyRequest.qualityManagerIds = [];
    if (req.body.qualityManagerId1) studyRequest.qualityManagerIds.push(parseInt(req.body.qualityManagerId1));
      if (req.body.qualityManagerId2) studyRequest.qualityManagerIds.push(parseInt(req.body.qualityManagerId2));

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

  public generateDocument(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const documentTypeId = req.params.documentTypeId;
    winston.info("Getting doc (of type " + documentTypeId + ") for id " + id);
    StudyService.generateDocument(id, documentTypeId, function (err, result: DocumentResponse | null) {
      if (err) {
        return next(err);
      }
      if (result && result.location) {
        res.redirect(result.location);
      } else {
        return next(new HttpError("Error when loading document", 500));
      }
    });
  }

  public uploadDocument(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const documentTypeId = req.params.documentTypeId;



    let path = "";
    if (req.files) {
      const file = <UploadedFile>req.files.file;
      file.mv("/tmp/" + file.name, function (err: any) {
        if (err) {
          winston.debug(err);
        }
      });
      path = "/tmp/" + file.name;
    }
    winston.info("Uploading doc (of type " + documentTypeId + ") for id " + id);
    StudyService.uploadDocument(id, documentTypeId, path, function (err) {
      if (err) {
        return next(err);
      }
      winston.info("Uploaded doc (of type" + documentTypeId + ") for id " + id);
      res.redirect("/ua/study/" + id);
    });

    /**
    winston.debug("Upload started");
    // const uploadedDocument = new UploadedDocument();
    /**if (req.files) {
      uploadedDocument.file = req.files.file;
    }
    winston.debug("Files found ");
    const uploadedDocument = new FormData();
    const busboy = new Busboy({headers: req.headers});
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      winston.debug('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      file.on('data', function(data) {
        winston.debug('File [' + fieldname + '] got ' + data.length + ' bytes');
      });
      file.on('end', function() {
        winston.debug('File [' + fieldname + '] Finished');
        // const fileUploaded = new File(data, filename);
        // uploadedDocument.append(filename, fileUploaded);
        uploadedDocument.append("file", file, {
          filename,
          contentType: mimetype
        });
        /**
         form.append('file', stdout, {
          filename: 'unicycle.jpg', // ... or:
          filepath: 'photos/toys/unicycle.jpg',
          contentType: 'image/jpeg',
          knownLength: 19806
        });

      });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      winston.debug('Field [' + fieldname + ']: value: ' + val);
    });
    busboy.on('finish', function() {
      winston.debug('Done parsing form in controller!');
      winston.info("Uploading doc (of type " + documentTypeId + ") for id " + id);

      StudyService.uploadDocument(id, documentTypeId, uploadedDocument, function (err) {
        if (err) {
          return next(err);
        }
        winston.info("Uploaded doc (of type" + documentTypeId + ") for id " + id);
        res.redirect("/ua/study/" + id);
      });
      //res.redirect("/ua/study/" + id);
    });
    winston.debug("Busboy created");
    req.pipe(busboy);
    winston.debug("Busboy launched");
    */

  }

  public downloadDocument(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const documentTypeId = req.params.documentTypeId;
    winston.info("Downloading doc (of type " + documentTypeId + ") for id " + id);
    StudyService.downloadDocument(id, documentTypeId, function (err, result: DocumentResponse | null) {
      if (err) {
        return next(err);
      }
      if (result && result.location) {
        res.redirect(result.location);
      } else {
        return next(new HttpError("Error when loading document", 500));
      }
    });
  }
}
