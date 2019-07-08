using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Weather.Models;

namespace Weather.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
       
        [HttpPost("update")]
        public ActionResult Update([FromBody] DashboardViewModel dashboard)
        {
            return Ok();
        }


        [HttpGet("[action]")]
        public ActionResult GetSummaries()
        {
            List<DashboardViewModel> dashboard = new List<DashboardViewModel>();

            dashboard.Add(new DashboardViewModel
            {
                City = "Obregón"
            });
            dashboard.Add(new DashboardViewModel
            {
                City = "Hermosillo"
            });
            dashboard.Add(new DashboardViewModel
            {
                City = "Navojoa"
            });
            dashboard.Add(new DashboardViewModel
            {
                City = "Nogales"
            });

            return Ok(dashboard);
        }


         
        [HttpPost("city")]
          public ActionResult City([FromBody] DashboardViewModel city)
          {
            List<DashboardViewModel> url = new List<DashboardViewModel>();
            switch (city.City)
              {
                case "0":
                    //Obregón
                    url.Add(new DashboardViewModel
                    {
                        Url = "lat=27.4833&lon=-109.9333&days=15"
                    });
                    //url = "lat=29.0767&lon=-110.02&days=15";
                    break;
                case "1":
                    //Hermosillo
                    url.Add(new DashboardViewModel
                    {
                        Url = "lat=29.0667&lon=-110.9667&days=15"
                    });
                    //url = "lat=29.0667&lon=-110.9667&days=15";
                      break;
                  case "2":
                    //Navojoa
                    url.Add(new DashboardViewModel
                    {
                        Url = "lat=27.9597&lon=-110.0875&days=15"
                    });
                    //url = "lat=27.9597&lon=-110.0875&days=15";
                      break;
                  case "3":
                    //Nogales
                    url.Add(new DashboardViewModel
                    {
                        Url = "lat=30.8&lon=-110.3833&days=15"
                    });
                    //url = "lat=30.8&lon=-110.3833&days=15";
                      break;
                  default:
                    url.Add(new DashboardViewModel
                    {
                        Url = "lat=27.4833&lon=-109.9333&days=15"
                    });
                    //url = "lat=29.0767&lon=-110.02&days=15";
                      break;

              }

            return Ok(url);

          }

        [HttpPost("scale")]
        public ActionResult Scale([FromBody] DashboardViewModel scale)
        {
            List<DashboardViewModel> value = new List<DashboardViewModel>();
            switch (scale.Scale)
            {
                case "0":
                    //celsius
                    value.Add(new DashboardViewModel
                    {
                        Scale = "0"
                    });
                    break;
                case "1":
                    //fahrenheit
                    value.Add(new DashboardViewModel
                    {
                        Scale = "1"
                    });
                    break;
                
                default:
                    value.Add(new DashboardViewModel
                    {
                        Scale = "0"
                    });
                    break;

            }

            return Ok(value);

        }

        [HttpPost("date")]
        public ActionResult Date([FromBody] DashboardViewModel date)
        {
            List<DashboardViewModel> dateValue = new List<DashboardViewModel>();

            dateValue.Add(new DashboardViewModel
            {
                Date = date.Date
            });
            return Ok(dateValue);
        }

    }
}