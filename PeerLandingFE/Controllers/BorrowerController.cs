﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PeerLandingFE.Controllers
{
    public class BorrowerController : Controller
    {
        
        public IActionResult Dashboard()
        {
            return View();
        }
    }
}
