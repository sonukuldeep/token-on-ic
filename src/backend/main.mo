import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";

actor Token {

  var owner : Principal = Principal.fromText("temrl-ptoir-cehov-rvau5-gfdoo-d3gfy-rzbsv-hdzlr-cmbrb-ehgk4-cae");
  var totalSupply : Nat = 1000_000_000;
  var symbol : Text = "SCOIN";

  var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  balances.put(owner, totalSupply);

  public query func balanceOf(who : Principal) : async Nat {

    let balance : Nat = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };
    return balance;
  };

  public query func getSymbol() : async Text {
    return symbol;
  };

  public shared (msg) func payOut() : async Text {
    if (balances.get(msg.caller) == null) {
      var amount = 10_000;
      balances.put(msg.caller, amount);
      return "Success!";
    } else {
      return "You have already claimed!";
    };
  };
};
