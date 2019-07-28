using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Weather.Models
{
    public class DashboardViewModel
    {
        public string City { get; set; }
        public string CityCode { get; set; }
        public DateTime? Date { get; set; }
        public string Scale { get; set; }
        public string Url { get; set; }
    }

    public class OpenWeatherResponse
    {
        public List<Data> Data { get; set; }
        public string City_name { get; set; }
    }


    public class Data
    {
        public string Max_temp { get; set; }
        public string Min_temp { get; set; }
        public string Datetime { get; set; }
        public string Temp { get; set; }
    }

}
