set ns [new Simulator]

$ns trace-all [open tra.tr w]
set nf [open p2.nam w]
$ns namtrace-all $nf
proc finish {args} \
{
	global ns nf
	$ns flush-trace
	close $nf
	exec nam p2.nam
}
set n0 [$ns node]
set n1 [$ns node]
$ns duplex-link $n0 $n1 1Mb 10ms DropTail

set udp0 [new Agent/UDP]
$ns attach-agent $n0 $udp0
set cbr0 [new Application/Traffic/CBR]

$cbr0 attach-agent $udp0
set null0 [new Agent/Null]
$ns attach-agent $n1 $null0
$ns connect $udp0 $null0

$ns at 0.5 "$cbr0 start"
$ns at 4.5 "$cbr0 end"
$ns at 5.0 finish
$ns end 