using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class QueryObject
    {
        public string? BrandName { get; set; } = string.Empty;
        public string? CarName { get; set; } = string.Empty;
        public string? SearchUser { get; set; } = string.Empty;
        public string? Search { get; set; } = string.Empty;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; }
    }
}