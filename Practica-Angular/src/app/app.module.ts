import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule, } from './app-routing.module';
import { AppComponent } from './app.component';
import { House1Component } from './components/house1/house1.component';
import { House2Component } from './components/house2/house2.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [AppComponent, House1Component, House2Component, HomeComponent],
  imports: [BrowserModule,  AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
