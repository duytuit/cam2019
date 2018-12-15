import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { YeucauService } from 'src/app/shared/services/yeucau.service';
import { Router } from '@angular/router';
import { sanpham } from 'src/app/shared/models/sanpham';
import { formatDate } from '@angular/common';
import { loaiphim } from 'src/app/shared/models/loaiphim';
import { may } from 'src/app/shared/models/may';
import { yeucaufilm } from 'src/app/shared/models/yeucau';

@Component({
  selector: 'app-add-yeucau',
  templateUrl: './add-yeucau.component.html',
  styleUrls: ['./add-yeucau.component.css']
})
export class AddYeucauComponent implements OnInit {
  showDropDownsanpham: boolean = false;
  showDropDownloaiphim: boolean = false;
  showDropDownmay: boolean = false;
  ShowInput: boolean = true;
  Message: string = '';
  phanloai:number;
  public idsanpham: number;
  public tensanpham: string;

  public idloaiphim: number;
  public tenloaiphim: string;

  public idmay: number;
  public tenmay: string;

  soluong: number;
  tylecodinh: number;
  tylex: number;
  tyley: number;

  getsanpham = [];
  getloaiphim = [];
  getmay = [];
  getsobo: any[];
  yeucau_filter: yeucaufilm[];
  loaiphim_filter: loaiphim[];
  tam: string;
  addyeucau = new FormGroup(
    {
      mayeucau: new FormControl(),
      tenyeucau: new FormControl(),
      loaiyeucau: new FormControl('', Validators.compose([Validators.required])),
      tilycodinh: new FormControl(0),
      x: new FormControl('', Validators.compose([Validators.required])),
      y: new FormControl('', Validators.compose([Validators.required])),
      noidungchitiet: new FormControl('', Validators.compose([Validators.required])),
      ghichu: new FormControl(''),
      tailieudinhkem: new FormControl(''),

      xacnhan: new FormControl(1),
      sobo: new FormControl('', Validators.compose([Validators.required])),
      thoigianyeucau: new FormControl(formatDate(Date.now(), 'yyyy-MM-dd HH:mm', 'en-US')),
      loaiphimid: new FormControl('', Validators.compose([Validators.required])),
      mayid: new FormControl(),
      bophanyeucauid: new FormControl(1),
      samphamid: new FormControl('', Validators.compose([Validators.required])),
      nguoiyeucauid: new FormControl(1),
      nguoixacnhanid: new FormControl(1),
      thoigianxacnhan: new FormControl(''),
    }
  );
  constructor(private yeucauService: YeucauService, private router: Router) {
  }
  ngOnInit() {
    this.yeucauService.GetAllsanpham().subscribe(data => this.getsanpham = data)
    this.yeucauService.GetAllloaiphim().subscribe(data => this.getloaiphim = data)
    this.yeucauService.GetAllmay().subscribe(data => this.getmay = data)
  }
  onAddyeucau() {
    let xMin = []
    let xMax = []
    let yMin = []
    let yMax = []
    let MinX: number;
    let MaxX: number;
    let MinY: number;
    let MaxY: number;
    this.loaiphim_filter = this.getloaiphim.filter(x => x.sanphamid === this.idsanpham && x.id === this.idloaiphim)
    if (this.tenloaiphim === "Phủ Sơn") {
      if (this.loaiphim_filter.length === 1) {
        xMin.push(this.loaiphim_filter[0]['x_min'])
        xMax.push(this.loaiphim_filter[0]['x_max'])
        yMin.push(this.loaiphim_filter[0]['y_min'])
        yMax.push(this.loaiphim_filter[0]['y_max'])
        MinX = Math.max.apply(null, xMin)
        MaxX = Math.max.apply(null, xMax)
        MinY = Math.max.apply(null, yMin)
        MaxY = Math.max.apply(null, yMax)
        if ((this.tylex >= MinX) && (this.tylex <= MaxX)) {
          if ((this.tyley >= MinY) && (this.tyley <= MaxY)) {
            this.Message = '';
            this.addyeucau.controls['tenyeucau'].reset('Yêu cầu mới');
            this.yeucauService.Addyeucau(this.addyeucau.value).subscribe(a => {
              this.yeucauService.GetAllyeucau().subscribe();
            });
            this.router.navigate(['/home/yeucau/list']);
          } else {
            this.Message = '';
            this.addyeucau.controls['tenyeucau'].reset('YC bất thường');
            this.yeucauService.Addyeucau(this.addyeucau.value).subscribe(a => {
              this.yeucauService.GetAllyeucau().subscribe();
            });
            this.router.navigate(['/home/yeucau/list']);
          }
        } else {
          this.Message = '';
          this.addyeucau.controls['tenyeucau'].reset('YC bất thường');
          this.yeucauService.Addyeucau(this.addyeucau.value).subscribe(a => {
            this.yeucauService.GetAllyeucau().subscribe();
          });
          this.router.navigate(['/home/yeucau/list']);
        }
      } else {
        this.Message = '';
        this.addyeucau.controls['tenyeucau'].reset('Yêu cầu mới');
        this.yeucauService.Addyeucau(this.addyeucau.value).subscribe(a => {
          this.yeucauService.GetAllyeucau().subscribe();
        });
        this.router.navigate(['/home/yeucau/list']);
      }
    } else {
      if (this.loaiphim_filter.length === 1) {
        this.loaiphim_filter = this.getloaiphim.filter(x => x.sanphamid === this.idsanpham && x.id === this.idloaiphim)
        let x = [];
        let y = [];
        let x1: number;
        let y1: number;
        x.push(this.loaiphim_filter[0]['x_min']);
        x1 = Math.max.apply(null, x);
        y.push(this.loaiphim_filter[0]['y_min']);
        y1 = Math.max.apply(null, y);
        if ((parseFloat(this.tylex.toString()) === x1) && (parseFloat(this.tyley.toString()) === y1)) {
          this.Message = '';
          this.addyeucau.controls['tenyeucau'].reset('Yêu cầu mới');
          this.yeucauService.Addyeucau(this.addyeucau.value).subscribe(a => {
            this.yeucauService.GetAllyeucau().subscribe();
          });
          this.router.navigate(['/home/yeucau/list']);
        } else {
          //=======không co ty le co dinh========>bất thường
          this.Message = '';
          this.addyeucau.controls['tenyeucau'].reset('YC bất thường');
          this.yeucauService.Addyeucau(this.addyeucau.value).subscribe(a => {
            this.yeucauService.GetAllyeucau().subscribe();
          });
          this.router.navigate(['/home/yeucau/list']);
        }
      } else {
        //=======không co ty le co dinh========>bất thường
        this.Message = 'Bất thường';
        this.Message = '';
        this.addyeucau.controls['tenyeucau'].reset('YC bất thường');
        this.yeucauService.Addyeucau(this.addyeucau.value).subscribe(a => {
          this.yeucauService.GetAllyeucau().subscribe();
        });
        this.router.navigate(['/home/yeucau/list']);
      }
    }
  }
  //sanpham
  selectValuesanpham(value: sanpham) {
    this.idsanpham = value.id;
    this.tensanpham = value.tensanpham;
  }
  closeDropDownsanpham() {
    this.showDropDownsanpham = !this.showDropDownsanpham;
  }
  openDropDownsanpham() {
    this.showDropDownsanpham = !this.showDropDownsanpham;
    this.showDropDownloaiphim = false;
    this.showDropDownmay = false;
  }
  //loaiphim
  selectValueloaiphim(value: loaiphim) {

    this.idloaiphim = value.id;
    this.tenloaiphim = value.tenloaiphim;
  }
  closeDropDownloaiphim() {
    this.showDropDownloaiphim = !this.showDropDownloaiphim;
  }
  openDropDownloaiphim() {
    this.loaiphim_filter = this.getloaiphim.filter(x => x.sanphamid === this.idsanpham)
    this.showDropDownloaiphim = !this.showDropDownloaiphim;
    this.showDropDownsanpham = false;
    this.showDropDownmay = false;
  }
  //may
  selectValuemay(value: may) {
    this.idmay = value.id;
    this.tenmay = value.tenmay;
  }
  closeDropDownmay() {
    this.showDropDownmay = !this.showDropDownmay;
  }
  openDropDownmay() {
    this.showDropDownmay = !this.showDropDownmay;
    this.showDropDownloaiphim = false;
    this.showDropDownsanpham = false;
  }
  onEvent(id: number): void {
    this.soluong = id;
  }

  onTyLe(tyle: number): void {
    // if (tyle != 0) {
    //   this.addyeucau.controls['x'].disable();
    //   this.addyeucau.controls['y'].disable();
    // }
    // else {
    //   this.addyeucau.controls['x'].enable();
    //   this.addyeucau.controls['y'].enable();
    // }

    if (this.tenloaiphim != "Phủ Sơn") {
      this.tylecodinh = tyle;
      this.loaiphim_filter = this.getloaiphim.filter(x => x.sanphamid === this.idsanpham && x.id === this.idloaiphim)
      let x = [];
      let y = [];
      let x1: number;
      let y1: number;
      x.push(this.loaiphim_filter[0]['x_min']);
      x1 = Math.max.apply(null, x);
      y.push(this.loaiphim_filter[0]['y_min']);
      y1 = Math.max.apply(null, y);
      if (this.tylecodinh != 0) {
        if (x1 != null && y1 != null) {
          this.tylex = x1;
          this.tyley = y1;
        }
      } else {
        //==kiểm tra tỷ lệ input có rỗng không
      }
    }
  }
  onPhanloai(loai:number){
     this.phanloai=loai;
  }
}
