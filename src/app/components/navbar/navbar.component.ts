import { Component, OnInit, ElementRef } from '@angular/core';
import { ADMIN_ROUTES } from '../sidebar/sidebar.component';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectorUserFirstAndLastNames,
    selectorIsLandlord,
    selectorIsTenant, } from '../../authentication/authentication.selectors';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthActions } from '../../authentication/action-types';

@Component({
  selector: 'robi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    loading = false;

    userNames$: any;
    isAdmin$: Observable<boolean>;
    isLandlord$: any;
    isTenant$: any;

    constructor(location: Location,  private element: ElementRef,
                private authenticationService: AuthenticationService,
                private auth: AuthenticationService,
                private router: Router, private store: Store) {
        this.isAdmin$ = this.authenticationService.isAdmin();
        this.isLandlord$ = this.store.pipe(select(selectorIsLandlord));
        this.isTenant$ = this.store.pipe(select(selectorIsTenant));

        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.userNames$ = this.store.pipe(select(selectorUserFirstAndLastNames));

        this.listTitles = ADMIN_ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            }else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { //asign a function
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }

        /**
     * Logout user
     */
         logout() {
            this.loading = true;
            this.auth.logout()
                .pipe(
                    tap(
                    user => {
                        this.loading = false;
                        this.store.dispatch(AuthActions.actionLogout());
                    }
                ))
                .subscribe(
                    () => {},
                    (error) => {
                        this.store.dispatch(AuthActions.actionLogout());
                        if (error.error.message) {
                        } else {
                        }
                        this.loading = false;
                    });
        }
}
