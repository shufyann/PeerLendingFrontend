using System.ComponentModel.DataAnnotations;

namespace PeerLendingFE.DTO.Req
{
    public class ReqUpdateBalanceDto
    {
        [Range(0, double.MaxValue, ErrorMessage = "Balance must be positive")]
        public decimal? Balance { get; set; }
    }
}
