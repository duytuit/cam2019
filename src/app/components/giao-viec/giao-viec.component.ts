import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { YeucauService } from 'src/app/shared/services/yeucau.service';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/shared/services/ExportToExcel/excel.service';
import { yeucaufilm } from 'src/app/shared/models/yeucau';
import { loaiphim } from 'src/app/shared/models/loaiphim';
import { sanpham } from 'src/app/shared/models/sanpham';
import { may } from 'src/app/shared/models/may';

@Component({
  selector: 'app-giao-viec',
  templateUrl: './giao-viec.component.html',
  styleUrls: ['./giao-viec.component.css']
})
export class GiaoViecComponent implements OnInit {
  yeucaufilm: yeucaufilm[];
  getyeucau: yeucaufilm[];
  loaiphim: loaiphim[];
  getloaiphim: loaiphim[];
  sanpham: sanpham[];
  getsanpham: sanpham[];
  may: may[];
  getmay: may[];
  @ViewChild('fromdate') fromdate: ElementRef;
  @ViewChild('todate') todate: ElementRef;
  constructor(private yeucauService: YeucauService, private router: Router, private excelService: ExcelService) { }

  ngOnInit() {
    this.yeucauService.GetAllloaiphim().subscribe(data => this.loaiphim = data);
    this.yeucauService.GetAllsanpham().subscribe(data => this.sanpham = data)
    this.yeucauService.GetAllmay().subscribe(data => this.may = data)
    this.yeucauService.GetAllyeucau().subscribe(data => {
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
    });
  }
  GetyeucauBydate(fromdate: string, todate: string): void {
    this.yeucauService.GetAllyeucau().subscribe(data => {
      this.yeucaufilm = data.filter(data => Date.parse(data.thoigianyeucau) > Date.parse(fromdate) && Date.parse(data.thoigianyeucau) <= Date.parse(todate))
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
    });
  }
  refresh(): void {
    this.fromdate.nativeElement.value = '';
    this.todate.nativeElement.value = '';
    this.yeucauService.GetAllyeucau().subscribe(data => {
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
    });
  }
  checkbox(id: number) {
    this.yeucauService.Deleteyeucau(id).subscribe(x => {
      this.yeucauService.GetAllyeucau().subscribe(data => {
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
      });
    });
  }
  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.getyeucau, 'yêu cầu film');
  }
}
