function checkEmails() {
  var webhookUrl = "URL_WEBHOOK_DISCORD"; // !!!!!!!!!!!!!!
  var query = 'from:alert@distill.io is:unread'; // Configured for Distill Web Monitor
  var threads = GmailApp.search(query, 0, 5);
  
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var messages = thread.getMessages();
    
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      if (!message.isUnread()) {
        continue; // Ignore read messages
      }
      
      var subject = message.getSubject();
      
      // Create payload for Discord
      var payload = {
        "content": "# " + subject + "\n <@ID_DISCORD>" // !!!!!!!!!!!!!!
      };
      
      var options = {
        "method": "post",
        "contentType": "application/json",
        "payload": JSON.stringify(payload)
      };
      
      // Send message to Discord
      UrlFetchApp.fetch(webhookUrl, options);
      
      // Mark message as read
      message.markRead();
    }
  }
}
