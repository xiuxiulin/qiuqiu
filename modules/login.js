const { log } = require('wechaty');
let loginUser = null;
const loginFun = function(eventEmitter) {
  eventEmitter.on('handlerLogin', async function(user) {
    console.log('处理login事件');

    loginUser = user.name();
    let msg = `${user.name()} logined`;

    // log.info('Bot', msg);
    // await this.say(msg);

    // msg = `setting to manageDingRoom() after 3 seconds ... `;
    // log.info('Bot', msg);
    // await this.say(msg);

    // setTimeout(manageDingRoom.bind(this), 3000);
  });

  async function manageDingRoom() {
    log.info('Bot', 'manageDingRoom()');

    /**
     * Find Room
     */
    try {
      const room = await bot.Room.find({ topic: /^浪浪浪大队/i });
      if (!room) {
        log.warn('Bot', 'there is no room topic ding(yet)');
        return;
      }
      log.info('Bot', 'start monitor "ding" room join/leave/topic event');

      /**
       * Event: Join
       */
      room.on('join', function(inviteeList, inviter) {
        log.verbose(
          'Bot',
          'Room EVENT: join - "%s", "%s"',
          inviteeList.map(c => c.name()).join(', '),
          inviter.name(),
        );
        console.log('room.on(join) id:', this.id);
        checkRoomJoin.call(this, room, inviteeList, inviter);
      });

      /**
       * Event: Leave
       */
      room.on('leave', (leaverList, remover) => {
        log.info(
          'Bot',
          'Room EVENT: leave - "%s" leave(remover "%s"), byebye',
          leaverList.join(','),
          remover || 'unknown',
        );
      });

      /**
       * Event: Topic Change
       */
      room.on('topic', (topic, oldTopic, changer) => {
        log.info(
          'Bot',
          'Room EVENT: topic - changed from "%s" to "%s" by member "%s"',
          oldTopic,
          topic,
          changer.name(),
        );
      });
    } catch (e) {
      log.warn('Bot', 'Room.find rejected: "%s"', e.stack);
    }
  }

  async function checkRoomJoin(room, inviteeList, inviter) {
    log.info(
      'Bot',
      'checkRoomJoin("%s", "%s", "%s")',
      await room.topic(),
      inviteeList.map(c => c.name()).join(','),
      inviter.name(),
    );

    try {
      // let to, content
      const userSelf = bot.userSelf();

      if (inviter.id !== userSelf.id) {
        await room.say(
          'RULE1: Invitation is limited to me, the owner only. Please do not invit people without notify me.',
          inviter,
        );
        await room.say(
          'Please contact me: by send "ding" to me, I will re-send you a invitation. Now I will remove you out, sorry.',
          inviteeList,
        );

        await room.topic('ding - warn ' + inviter.name());
        setTimeout(_ => inviteeList.forEach(c => room.del(c)), 10 * 1000);
      } else {
        await room.say('Welcome to my room! :)');

        let welcomeTopic;
        welcomeTopic = inviteeList.map(c => c.name()).join(', ');
        await room.topic('ding - welcome ' + welcomeTopic);
      }
    } catch (e) {
      log.error('Bot', 'checkRoomJoin() exception: %s', e.stack);
    }
  }
};
const getLoginUser = function() {
  return loginUser;
};
module.exports = {
  loginFun,
  getLoginUser,
};
