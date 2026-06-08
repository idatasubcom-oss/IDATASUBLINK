// WEBHOOK
router.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    if (data.eventType === "SUCCESSFUL_TRANSACTION") {
      const payment = data.eventData;

      // accountReference da ka tura lokacin create-account
      const user = await User.findById(
        payment.accountDetails?.accountReference
      );

      if (!user) {
        return res.sendStatus(200);
      }

      // Gujewa duplicate funding
      const existingTx = await Transaction.findOne({
        reference: payment.transactionReference,
      });

      if (existingTx) {
        return res.sendStatus(200);
      }

      user.balance += Number(payment.amountPaid);
      await user.save();

      await Transaction.create({
        userId: user._id,
        amount: payment.amountPaid,
        type: "Wallet Funding",
        status: "Success",
        reference: payment.transactionReference,
      });
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
