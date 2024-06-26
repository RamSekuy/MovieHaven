"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
const ticket_service_1 = __importDefault(require("../service/ticket.service"));
class TicketController {
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield ticket_service_1.default.getAll(req);
                res.send({
                    message: "fetch ticket",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getTickets(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //   try {
            //     const data = await ticketService.getTickets(req);
            //     res.send({
            //       message: "The ticket has been purchased ",
            //       data,
            //     });
            //   } catch (error) {
            //     next(error);
            //   }
        });
    }
    getByOmdbIdfillterBranchAndTime(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield ticket_service_1.default.getByOmdbIdfillterBranchAndTime(req);
                res.send({
                    message: "fetch ticket",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getByStudio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield ticket_service_1.default.getByStudio(req);
                res.send({
                    message: "The ticket has been purchased ",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    addTicketsForStudio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield ticket_service_1.default.addTicketsForStudio(req);
                res.status(201).send({
                    message: "kata kata mutiara",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield ticket_service_1.default.updateTicket(req);
                res.status(200).send({
                    message: "Ticket update",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield ticket_service_1.default.deleteTicket(req);
                res.status(200).send({
                    message: "Ticket delete",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TicketController = TicketController;
exports.default = new TicketController();
