import { Course } from "./course";
import { Lesson } from "./lesson";

export class User {
    constructor(
        public id: number,
        public name: string,       
        public email: string,   
        public password: string,   // סיסמה של המשתמש
        public role: string,
        // public courses: Course[]     // תפקיד המשתמש
    ) {}
}
