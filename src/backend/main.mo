import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {

  let owner : Principal = Principal.fromText("temrl-ptoir-cehov-rvau5-gfdoo-d3gfy-rzbsv-hdzlr-cmbrb-ehgk4-cae");
  let totalSupply : Nat = 1000_000_000;
  let symbol : Text = "SCOIN";

  // https://internetcomputer.org/docs/current/motoko/main/base/Array/
  private stable var balancesEntries : [(Principal, Nat)] = [];

  // https://internetcomputer.org/docs/current/motoko/main/base/HashMap
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

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
      let amount = 10_000;
      let result = await transfer(msg.caller, amount);
      return result;
    } else {
      return "You have already claimed!";
    };
  };

  public shared (msg) func transfer(to : Principal, amount : Nat) : async Text {
    let fromBalance = await balanceOf(msg.caller);

    if (fromBalance > amount) {
      let newFromBalance : Nat = fromBalance - amount;
      balances.put(msg.caller, newFromBalance);
      let toBalance = await balanceOf(to);
      let newToBalance = toBalance + amount;
      balances.put(to, newToBalance);

      return "Success";
    } else return "Insufficiant funds";
  };

  system func preupgrade() {
    // https://internetcomputer.org/docs/current/motoko/main/base/Iter
    balancesEntries := Iter.toArray(balances.entries());
  };

  system func postupgrade() {
    let iter = balancesEntries.vals();
    let size = balancesEntries.size();
    // https://internetcomputer.org/docs/current/motoko/main/base/HashMap
    balances := HashMap.fromIter<Principal, Nat>(iter, size, Principal.equal, Principal.hash);
    if (balances.size() < 1) {
      balances.put(owner, totalSupply);
    };
  };
};
