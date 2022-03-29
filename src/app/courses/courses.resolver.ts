import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { filter, finalize, first, Observable, tap } from "rxjs";
import { AppState } from "../reducers";
import { loadAllCourses } from "./course.actions";
import { selectAreCoursesLoaded } from "./courses.selectors";

@Injectable()
export class CoursesResolver implements Resolve<any> {

    loading = false;

    constructor(private store: Store<AppState>) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store
            .pipe(
                select(selectAreCoursesLoaded),
                tap((coursesLoaded) => {
                    if (!this.loading && !coursesLoaded) {
                        this.loading = true;
                        this.store.dispatch(loadAllCourses());
                    }
                }),
                filter((coursesLoaded) => coursesLoaded),
                first(),
                finalize(() => this.loading = false)
            );
    }
}