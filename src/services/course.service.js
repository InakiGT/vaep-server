"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_1 = require("../database/schemas/course");
const theme_1 = require("../database/schemas/theme");
class CourseService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield course_1.Course.find();
                return data;
            }
            catch (err) {
                console.error('Error trying to get courses from DB: ', err);
                throw new Error('Error al consultar la base de datos');
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield course_1.Course.findById(id).exec();
                if (!course) {
                    throw new Error('Curso no encontrado');
                }
                const themes = yield theme_1.Theme.find({ course: course._id });
                const data = Object.assign(Object.assign({}, course.toObject()), { themes });
                return data;
            }
            catch (err) {
                console.error('Error trying to get a course from DB: ', err);
                throw new Error('Error al consultar la base de datos');
            }
        });
    }
    create(courseData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = new course_1.Course(courseData);
                const response = yield course.save();
                return response;
            }
            catch (err) {
                console.error('Error trying to create a course into DB: ', err);
                throw new Error('Error al modificar la base de datos');
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield course_1.Course.findByIdAndUpdate({ _id: id }, Object.assign({}, data));
                return response;
            }
            catch (err) {
                console.error('Error trying to update a course from DB: ', err);
                throw new Error('Error al modificar la base de datos');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield course_1.Course.findOneAndDelete({ _id: id });
                return `La materia con id: ${id} fue eliminada`;
            }
            catch (err) {
                console.error('Error trying to remove a course from DB: ', err);
                throw new Error('Error al modificar la base de datos');
            }
        });
    }
}
exports.default = CourseService;
