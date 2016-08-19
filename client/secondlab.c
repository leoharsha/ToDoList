#include <stdio.h>

#include <sys/types.h>
#include <unistd.h>
#include <signal.h>
#include <sys/wait.h>

void event(int signo) {
	if (signo==SIGCHLD)
	{
		printf("Child process is terminated.\n");
			}
			else if (signo== SIGINT)
			{
				printf("Ctrl + C is not allowed\n");
			}
			else if (signo== SIGTERM)
			{
				printf("KILL not allowed\n");
			}


}

int main(int argc, char const *argv[])
{
	signal(SIGCHLD,event);
	signal(SIGINT,event);
	signal(SIGTERM,event);
	int	id;
	id= fork();
	if(id==0) {
		printf("Child has created: %d\n", getpid());
		
	}
	else {
		printf("Parent has started:= %d\n",getpid());
		

	}
	printf("After fork\n");
	}