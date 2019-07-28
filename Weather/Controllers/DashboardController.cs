using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Weather.Models;
using System.Net.Http;
using Newtonsoft.Json;

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
                City = "Obregón",
                CityCode = "4013704",
                Scale = "M"
            });
            dashboard.Add(new DashboardViewModel
            {
                City = "Hermosillo",
                CityCode = "4004898",
                Scale = "M"
            });
            dashboard.Add(new DashboardViewModel
            {
                City = "Navojoa",
                CityCode = "3995019",
                Scale = "M"
            });
            dashboard.Add(new DashboardViewModel
            {
                City = "Nogales",
                CityCode = "4004886",
                Scale = "M"
            });

            return Ok(dashboard);
        }

        [HttpGet("[action]/{city}&{unit}")]
        public async Task<IActionResult> City(string city, string unit)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri("https://api.weatherbit.io");
                    var response = await client.GetAsync($"/v2.0/forecast/daily?city_id={city}&key=0c6c94f36921468e8d58e95901ef9d6b&days=15&units={unit}");
                    response.EnsureSuccessStatusCode();

                    IList<OpenWeatherResponse> searchResults = new List<OpenWeatherResponse>();
                    var stringResult = await response.Content.ReadAsStringAsync();
                    var rawWeather = JsonConvert.DeserializeObject<OpenWeatherResponse>(stringResult);
                    return Ok(new
                    {
                        rawWeather.Data
                    }
                    );
                }
                catch (HttpRequestException httpRequestException)
                {
                    return BadRequest($"Error getting weather from OpenWeather: {httpRequestException.Message}");
                }
            }
        }

        [HttpPost("cityPausa")]
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