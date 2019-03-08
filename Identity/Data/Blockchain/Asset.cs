using System.Globalization;

namespace EosAsk.Data.Blockchain
{
    public class Asset
    {
        public double Amount { get; set; }

        public string Symbol { get; set; } = "SYS";

        public override string ToString()
        {
            return $"{Amount.ToString("0.0000", CultureInfo.InvariantCulture)} ${Symbol}";
        }
    }
}