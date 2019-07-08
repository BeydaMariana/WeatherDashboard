using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Weather.Models
{
    public class DashboardViewModel
    {
        public string City { get; set; }
        public DateTime? Date { get; set; }
        public string Scale { get; set; }
        public string Url { get; set; }
    }

}
