import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs";
import { CourseActions } from "./action-types";
import { allCoursesLoaded } from "./course.actions";
import { Course } from "./model/course";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CoursesEffects {

    loadCourses$ = createEffect(() => this.actions$.pipe(
        ofType(CourseActions.loadAllCourses),
        concatMap((_) => this.coursesHttpService.findAllCourses()),
        map((courses: Course[]) => allCoursesLoaded({ courses }))
    ));

    saveCourses$ = createEffect(() => this.actions$.pipe(
        ofType(CourseActions.courseUpdated),
        concatMap((update) => this.coursesHttpService.saveCourse(update.update.id, update.update.changes)),
    ), { dispatch: false })

    constructor(
        private actions$: Actions,
        private coursesHttpService: CoursesHttpService) {}
}