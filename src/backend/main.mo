import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
actor Token {

  var owner : Principal = Principal.fromText("temrl-ptoir-cehov-rvau5-gfdoo-d3gfy-rzbsv-hdzlr-cmbrb-ehgk4-cae");
  var totalSupply : Nat = 1000000000;
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
};
