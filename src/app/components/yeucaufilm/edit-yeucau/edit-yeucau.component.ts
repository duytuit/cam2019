import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {YeucauService} from 'src/app/shared/services/yeucau.service';
import { yeucaufilm } from 'src/app/shared/models/yeucau';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { loaiphim } from 'src/app/shared/models/loaiphim';
import { may } from 'src/app/shared/models/may';
import { sanpham } from 'src/app/shared/models/sanpham';

@Component({
  selector: 'app-edit-yeucau',
  templateUrl: './edit-yeucau.component.html',
  styleUrls: ['./edit-yeucau.component.css']
})
export class EditYeucauComponent implements OnInit {
  @Input() yeucau:yeucaufilm;
  showDropDownsanpham: boolean = false;
  showDropDownloaiphim: boolean = false;
  showDropDownmay: boolean = false;
  ShowInput: boolean = true;
  Message: string = '';

  public idsanpham: number;
  public tensanpham: string;

  public idloaiphim: number;
  public tenloaiphim: string;

  public idmay: number;
  public tenmay: string;

  soluong: number;
  phanloai:number;
  tylecodinh: number;
  tylex: number;
  tyley: number;
  idyeucau:number;

  yeucaufilm: yeucaufilm[];
  getyeucau: yeucaufilm[];
  loaiphim: loaiphim[];
  getloaiphim: loaiphim[];
  sanpham: sanpham[];
  getsanpham: sanpham[];
  may: may[];
  getmay: may[];

  getsobo: any[];
  yeucau_filter: yeucaufilm[];
  loaiphim_filter: loaiphim[];
  addyeucau = new FormGroup(
    {
      id:new FormControl(),
      mayeucau: new FormControl(1),
      tenyeucau: new FormControl(1),
      loaiyeucau: new FormControl(),
      tilycodinh: new FormControl(),
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
  constructor(private yeucauService:YeucauService ,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.yeucauService.GetAllsanpham().subscribe(data => this.sanpham = data)
    this.yeucauService.GetAllloaiphim().subscribe(data => this.loaiphim = data)
    this.yeucauService.GetAllmay().subscribe(data => this.may = data)
   this.getHero();
  }
  getHero() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.idyeucau=id;
    this.yeucauService.Getyeucau(id).subscribe(data=>this.yeucau=data);
    this.yeucauService.GetAllyeucau().subscribe(data=>{
    this.yeucaufilm=data.filter(data=>data.id===id)
    this.getyeucau=this.yeucaufilm
    this.getloaiphim=this.loaiphim.filter(data=>data.id===this.getyeucau[0].loaiphimid)
    this.getsanpham=this.sanpham.filter(data=>data.id===this.getloaiphim[0].sanphamid)
    this.getmay=this.may.filter(data=>data.id===this.getyeucau[0].mayid)
    this.tensanpham=this.getsanpham[0].tensanpham
    this.tenloaiphim=this.getloaiphim[0].tenloaiphim
    this.tenmay=this.getmay[0].tenmay
    })
  }
  onEdityeucau(): void {
    this.yeucauService.Updateyeucau(this.addyeucau.value).subscribe();
    this.yeucauService.GetAllyeucau().subscribe(data=>{
        this.yeucaufilm = data;
        this.getyeucau = this.yeucaufilm;
        for (let i = 0; i < this.getyeucau.length; i++) {
          this.getloaiphim = this.loaiphim.filter(data => data.id === this.getyeucau[i].loaiphimid)
          this.getsanpham = this.sanpham.filter(data => data.id === this.getloaiphim[0].sanphamid)
          this.getmay = this.may.filter(data => data.id === this.getyeucau[i].mayid)
          this.getyeucau[i].sanpham = this.getsanpham[0].tensanpham
          this.getyeucau[i].loaiphim = this.getloaiphim[0].tenloaiphim
          this.getyeucau[i].may = this.getmay[0].tenmay
          if(this.getyeucau[i].loaiyeucau===1)
          {
            this.getyeucau[i].phanloai="hàng mới"
          }
          if(this.getyeucau[i].loaiyeucau===2)
          {
            this.getyeucau[i].phanloai="làm lại"
          }
          if(this.getyeucau[i].loaiyeucau===3)
          {
            this.getyeucau[i].phanloai="thay đổi"
          }
        }
        return this.getyeucau
      }
    );
    this.router.navigate(['/home/yeucau/list']);
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
