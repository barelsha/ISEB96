import { Component, OnInit } from '@angular/core';
import {ConfigService, Config} from '../../services/config/config.service'

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor(private configService: ConfigService) { }
  config: Config;
  headers: any;
  error: any;
  ngOnInit() {
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
  
        // access the body directly, which is typed as `Config`.
        this.config = resp.body;
      }, error => this.error = error /*error path*/);
  }

}
