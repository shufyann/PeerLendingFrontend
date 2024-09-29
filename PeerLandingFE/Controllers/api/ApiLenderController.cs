using Microsoft.AspNetCore.Mvc;
using PeerLendingFE.DTO.Req;
using PeerLendingFE.DTO.Res;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace PeerLendingFE.Controllers.api
{
    public class ApiLenderController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public ApiLenderController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpGet]
        public async Task<IActionResult> GetMessage()
        {
            return Ok("HEHE");
        }

        [HttpGet]
        public async Task<IActionResult> GetBalance(string id)
        {
            var response = await _httpClient.GetAsync($"https://localhost:7218/rest/v1/lender/GetBalance?id={id}");
            if (response.IsSuccessStatusCode)
            {
                var balanceDto = await response.Content.ReadFromJsonAsync<ResBalanceDto>();
                return Ok(new { success = true, data = balanceDto });
            }
            return NotFound(new { success = false, message = "Balance not found." });
        }

        [HttpPut]
        public async Task<IActionResult> UpdateBalance(string id, [FromBody] ReqUpdateBalanceDto dto)
        {
            var response = await _httpClient.PutAsJsonAsync($"https://localhost:7218/rest/v1/lender/UpdateBalance?id={id}", dto);
            if (response.IsSuccessStatusCode)
            {
                return Ok(new { success = true, message = "Balance updated successfully." });
            }
            return BadRequest(new { success = false, message = "Failed to update balance." });
        }
    }
}
