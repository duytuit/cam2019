import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { yeucaufilm } from 'src/app/shared/models/yeucau';
import { sanpham } from 'src/app/shared/models/sanpham';
import { loaiphim } from 'src/app/shared/models/loaiphim';
import { Observable } from 'rxjs';
import { may } from '../models/may';

@Injectable({
  providedIn: 'root'
})
export class KetquaService {
  public APIyeucau: string = "http://192.84.100.207/camapi/api/yeucaus";

  public APIsanpham: string = "http://192.84.100.207/camapi/api/sanphams";

  public APIgiaoviec: string = "http://192.84.100.207/camapi/api/giaoviecs";

  public APIketqua: string = "http://192.84.100.207/camapi/api/ketquas";


  constructor(public http: HttpClient) { }
}
